import { useEffect, useState } from "react";
import { MdOutlineModeComment } from "react-icons/md";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import Button from "../../components/Button";
import useRequest from "../../hooks/useRequest";

const BoardList = ({ posts, viewPost, getBoard, createPost }) => {
	const [filteredPosts, setFilteredPosts] = useState(posts);
	const [search, setSearch] = useState("");

	const filterPosts = (e) => {
		let filtered = posts;

		if (search !== "") {
			filtered = posts.filter((post) =>
				post.title.toLowerCase().includes(search.toLowerCase())
			);
		}

		setFilteredPosts(filtered);
	};

	useEffect(() => {
		filterPosts();
	}, [posts, search]);

	const viewPostHandler = (post) => {
		getBoard();
		viewPost(post);
	};

	const setUpvote = (e, post, value) => {
		e.stopPropagation();
		useRequest("POST", "/post-comment/vote/set/", {
			post_id: post.id,
			value: value,
		}).then(() => {
			getBoard();
		});
	};

	return (
		<>
			<div className="board-controls">
				<div className="board-controls__filter">
					<input
						type="text"
						className="board-controls__filter__search"
						placeholder="Search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<Button
					className="board-controls__new-post"
					onClick={createPost}
				>
					New Post
				</Button>
			</div>

			<div className="board-list">
				{posts.length === 0 && (
					<div className="board-list__empty">
						No one has posted yet. Be the first!
						<Button onClick={createPost}>New Post</Button>
					</div>
				)}

				{filteredPosts.map((post, key) => (
					<div
						key={key}
						className="board-list__post"
						onClick={() => viewPostHandler(post)}
					>
						<div className="board-list__post__votes">
							<IoChevronUpOutline
								className={`board-list__post__votes__button ${
									post.user_vote === 1 && "active"
								}`}
								onClick={(e) => setUpvote(e, post, 1)}
							/>
							<div className="board-list__post__votes__count">
								{post.votes}
							</div>
							<IoChevronDownOutline
								className={`board-list__post__votes__button ${
									post.user_vote === -1 && "active"
								}`}
								onClick={(e) => setUpvote(e, post, -1)}
							/>
						</div>
						<div className="board-list__post__author">
							{post.author.avatar ? (
								<img src={post.author.avatar} />
							) : (
								post.author.name.charAt(0).toUpperCase()
							)}
						</div>
						<div className="board-list__post__content">
							<div className="board-list__post__content__title">
								{post.title}
							</div>
							<p className="board-list__post__content__description">
								{post.content}
							</p>
							<div className="board-list__post__content__labels">
								{post.labels.map((label, key) => (
									<div
										key={key}
										className="board-list__post__content__labels__label"
									>
										{label.name}
									</div>
								))}
							</div>

							<div className="board-list__post__content__footer">
								<div className="board-list__post__content__footer__date">
									{post.posted_since}
								</div>
								<div className="board-list__post__content__footer__comments">
									<MdOutlineModeComment />{" "}
									{post.comments.length}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default BoardList;
