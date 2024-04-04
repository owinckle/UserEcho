import { useEffect, useState } from "react";
import { BoardList } from "../../components/Boards";
import { MainTitle } from "../../components/Layout";
import useRequest from "../../hooks/useRequest";
import Post from "../../components/Post";

const FeatureRequests = () => {
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState(null);

	const getBoard = async () => {
		useRequest("POST", "/board/feature-requests/get/", {
			space_slug: window.location.hostname.split(".")[0],
		}).then((data) => {
			setPosts(data);
		});
	};

	useEffect(() => {
		getBoard();
	}, []);

	return (
		<>
			<MainTitle>Feature Requests</MainTitle>

			<BoardList posts={posts} viewPost={setPost} />

			{post && <Post post={post} onClose={() => setPost(null)} />}
		</>
	);
};

export default FeatureRequests;
