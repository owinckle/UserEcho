import Button from "../Button";
import "./styles.scss";
import { IoCloseOutline } from "react-icons/io5";

const Post = ({ post, onClose }) => {
	const closeHandler = (e) => {
		onClose();
	};

	console.log(post);
	return (
		<>
			<div className="post-overlay" onClick={closeHandler}></div>
			<div className="post">
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
							<div className="post__body__content__labels__label">
								General
							</div>
							<div className="post__body__content__labels__label">
								General
							</div>
							<div className="post__body__content__labels__label">
								General
							</div>
						</div>

						<textarea
							className="post__body__content__comment"
							rows="5"
							placeholder="Leave a comment..."
						></textarea>
						<Button className="post__body__content__submit-comment">
							Submit
						</Button>

						<div className="post__body__content__comments">
							<div className="post__body__content__comments__title">
								Comments
							</div>

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
								</div>
							))}
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
								{post.posted_since}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Post;
