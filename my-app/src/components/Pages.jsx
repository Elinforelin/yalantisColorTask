import { useEffect, useMemo, useState } from "react";
import { MONTHS } from "../data/constants";
import { getApi } from "../data/data";
import classes from "./pages.module.css";

function Pages() {
	const [usersData, setUsersData] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);

	useEffect(() => {
		getApi().then((data) => {
			data.sort((a, b) =>
				a.firstName.charAt(0) > b.firstName.charAt(0) ? 1 : -1
			);
			return setUsersData(data);
		});
	}, []);

	const selectedUsersByMonths = useMemo(() => {
		return MONTHS.map(({ title, number }) => ({
			title,
			number,
			users: usersData.filter(
				({ dob }) => new Date(dob).getMonth() + 1 === number
			),
		}));
	}, [usersData]);

	const onMouseOver = (event) => {
		let users = usersData.filter(
			({ dob }) => new Date(dob).getMonth() + 1 === +event.target.id
		);

		setSelectedUsers([...selectedUsers, ...users]);
	};
	const onMouseLeave = () => {
		setSelectedUsers((prevSelectedUser) => prevSelectedUser.splice());
	};

	const monthColor = (number) => {
		if (number <= 2) {
			return classes.grey;
		} else if (number >= 3 && number <= 6) {
			return classes.blue;
		} else if (number >= 7 && number <= 10) {
			return classes.green;
		} else {
			return classes.red;
		}
	};

	return (
		<div className={classes.wrap}>
			<div className={classes.months}>
				<ul>
					{selectedUsersByMonths.map((item) => (
						<li
							className={monthColor(item.users.length)}
							key={item.number}
							id={item.number}
							onMouseEnter={onMouseOver}
							onMouseLeave={onMouseLeave}
						>
							{item.title} {"("}
							{item.users.length}
							{")"}
						</li>
					))}
				</ul>
			</div>
			<div className={classes.users}>
				<ol>
					{!!selectedUsers.length &&
						selectedUsers.map((user) => (
							<li key={user.id}>
								{user.firstName} {user.lastName}
							</li>
						))}
				</ol>
			</div>
		</div>
	);
}

export default Pages;
