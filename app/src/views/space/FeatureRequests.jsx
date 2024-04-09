import { useEffect, useState } from "react";
import { BoardList } from "../../components/Boards";
import { MainTitle } from "../../components/Layout";
import useRequest from "../../hooks/useRequest";
import { PostCreate, PostView } from "../../components/Post";

const FeatureRequests = () => {
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState(null);
	const [createPostModal, setCreatePostModal] = useState(false);

	const getBoard = async () => {
		useRequest("POST", "/board/feature-requests/get/", {
			space_slug: window.location.hostname.split(".")[0],
		}).then((data) => {
			setPosts(data);

			if (post) {
				const newPost = data.find((p) => p.id === post.id);
				if (!newPost) {
					setPost(null);
				} else {
					setPost(newPost);
				}
			}
		});
	};

	useEffect(() => {
		getBoard();
	}, []);

	return (
		<>
			<MainTitle>Feature Requests</MainTitle>

			<BoardList
				posts={posts}
				viewPost={setPost}
				getBoard={getBoard}
				createPost={() => setCreatePostModal(true)}
			/>

			{post && (
				<PostView
					post={post}
					getBoard={getBoard}
					onClose={() => setPost(null)}
				/>
			)}

			{createPostModal && (
				<PostCreate
					getBoard={getBoard}
					boardType="feature_requests"
					onClose={() => setCreatePostModal(false)}
				/>
			)}
		</>
	);
};

export default FeatureRequests;
