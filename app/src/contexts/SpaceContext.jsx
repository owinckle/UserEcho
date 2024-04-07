import { useState, createContext, useEffect, useContext } from "react";
import useRequest from "../hooks/useRequest";
import UserContext from "./UserContext";

const SpaceContext = createContext(null);

export const SpaceProvider = ({ children }) => {
	const { loading: userLoading, user } = useContext(UserContext);
	const [loading, setLoading] = useState(true);
	const [space, setSpace] = useState(null);
	const [member, setMember] = useState({
		isStaff: false,
		role: "member",
	});

	const getSpace = () => {
		useRequest("POST", "/space/get/", {
			slug: window.location.hostname.split(".")[0],
		}).then((data) => {
			setSpace(data.space);
			setMember({
				isStaff: data.roles.is_staff,
				role: data.roles.role,
			});
			setLoading(false);
		});
	};

	useEffect(() => {
		if (!userLoading && !user) {
			window.location.href = `${window.location.protocol}//${
				import.meta.env.VITE_APP_DOMAIN
			}/login`;
		} else {
			getSpace();
		}
	}, [userLoading, user]);

	if (loading || userLoading) {
		return <div>Loading...</div>;
	}

	return (
		<SpaceContext.Provider
			value={{
				space,
				member,
			}}
		>
			{children}
		</SpaceContext.Provider>
	);
};

export default SpaceContext;
