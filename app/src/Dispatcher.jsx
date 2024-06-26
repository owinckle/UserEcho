import Landing from "./views/landing";
import App from "./views/app";
import Space from "./views/space";
import { SpaceProvider } from "./contexts/SpaceContext";

const Dispatcher = () => {
	const host = window.location.hostname;
	const parts = host.split(".");
	if (parts.length == 2) {
		return <Landing />;
	} else if (parts.length == 3) {
		if (parts[0] == "app") {
			return <App />;
		} else {
			return (
				<SpaceProvider>
					<Space />
				</SpaceProvider>
			);
		}
	}
};

export default Dispatcher;
