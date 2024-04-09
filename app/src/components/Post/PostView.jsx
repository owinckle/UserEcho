import "./styles.scss";
import { useState } from "react";
import Button from "../Button";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import useRequest from "../../hooks/useRequest";

const PostView = ({ post, getBoard, onClose }) => {
	const [closing, setClosing] = useState(false);

	const closeHandler = (e) => {
		setClosing(true);
		setTimeout(() => {
			onClose();
		}, 200);
	};

	const deletePost = () => {
		useRequest("POST", "/post/delete/", {
			post_id: post.id,
		})
			.then(() => {
				getBoard();
				closeHandler();
				toast.success("Post deleted successfully");
			})
			.catch(() => {
				toast.error("An error occurred while deleting the post");
			});
	};

	const deleteComment = (comment_id) => {
		useRequest("POST", "/post/comment/delete/", {
			comment_id,
		})
			.then(() => {
				getBoard();
				toast.success("Comment deleted successfully");
			})
			.catch(() => {
				toast.error("An error occurred while deleting the comment");
			});
	};

	const [commentContent, setCommentContent] = useState("");
	const createComment = () => {
		useRequest("POST", "/post/comment/create/", {
			post_id: post.id,
			content: commentContent,
		})
			.then(() => {
				getBoard();
				setCommentContent("");
				toast.success("Comment created successfully");
			})
			.catch(() => {
				toast.error("An error occurred while creating the comment");
			});
	};

	return (
		<>
			<div
				className={`post-overlay ${closing && "closing"}`}
				onClick={closeHandler}
			></div>
			<div className={`post ${closing && "closing"}`}>
				<div className="post__header">
					<div className="post__header__title">{post.title}</div>
					<IoCloseOutline
						className="post__header__close"
						onClick={closeHandler}
					/>
				</div>
				<div className="post__body">
					<div className="post__body__content">
						<p className="post__body__content__text">
							{post.content}
						</p>

						<div className="post__body__content__labels">
							{post.labels.map((label, key) => (
								<div
									key={key}
									className="post__body__content__labels__label"
								>
									{label.name}
								</div>
							))}
						</div>

						<textarea
							className="post__body__content__comment"
							rows="5"
							placeholder="Leave a comment..."
							value={commentContent}
							onChange={(e) => setCommentContent(e.target.value)}
						></textarea>
						<Button
							className="post__body__content__submit-comment"
							onClick={createComment}
						>
							Submit
						</Button>

						<div className="post__body__content__comments">
							<div className="post__body__content__comments__title">
								Comments ({post.comments.length})
							</div>

							<div className="post__body__content__comments-container">
								{post.comments.map((comment, key) => (
									<div
										key={key}
										className="post__body__content__comments__comment"
									>
										<div className="post__body__content__comments__comment__author">
											{comment.author.name}
										</div>
										<div className="post__body__content__comments__comment__content">
											{comment.content}
										</div>
										<div className="post__body__content__comments__comment__meta">
											<div className="post__body__content__comments__comment__meta__date">
												{comment.posted_since}
											</div>
											<div
												className="post__body__content__comments__comment__meta__delete danger hover"
												onClick={() =>
													deleteComment(comment.id)
												}
											>
												Delete
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="post__body__meta">
						<div className="post__body__meta__item">
							<div className="post__body__meta__item__label">
								Status
							</div>
							<div className="post__body__meta__item__value">
								<select>
									<option value="">Planned</option>
									<option value="">In Progress</option>
									<option value="">Completed</option>
								</select>
							</div>
						</div>
						<div className="post__body__meta__item">
							<div className="post__body__meta__item__label">
								Author
							</div>
							<div className="post__body__meta__item__value">
								{post.author.name}
							</div>
						</div>
						<div className="post__body__meta__item">
							<div className="post__body__meta__item__label">
								Created
							</div>
							<div className="post__body__meta__item__value">
								{post.creation_date}
							</div>
						</div>

						<div className="post__body__meta__item">
							<div
								className="post__body__meta__item__value danger hover"
								onClick={deletePost}
							>
								Delete post
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PostView;
