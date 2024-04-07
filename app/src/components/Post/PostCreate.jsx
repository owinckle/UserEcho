import { useContext, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Form } from "../Form";
import SpaceContext from "../../contexts/SpaceContext";
import useRequest from "../../hooks/useRequest";
import { toast } from "react-toastify";

const PostCreate = ({ getBoard, boardType, onClose }) => {
	const { space } = useContext(SpaceContext);

	const [closing, setClosing] = useState(false);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [labels, setLabels] = useState([]);

	const closeHandler = () => {
		setClosing(true);
		setTimeout(() => {
			onClose();
		}, 200);
	};

	const labelsDropdownRef = useRef(null);
	const [labelsDropdownHeight, setlabelsDropdownHeight] = useState(0);
	const openlabelsDropdown = () => {
		setlabelsDropdownHeight(labelsDropdownRef.current.scrollHeight);
	};

	const closelabelsDropdown = () => {
		setlabelsDropdownHeight(0);
	};

	const toggleLabel = (label) => {
		if (labels.includes(label)) {
			setLabels(labels.filter((l) => l !== label));
		} else {
			setLabels([...labels, label]);
		}
	};

	const createPost = () => {
		if (!title || !content) {
			toast.error("Title and content are required.");
			return;
		}

		useRequest("POST", "/post/create/", {
			board_type: boardType,
			space_id: space.id,
			title,
			content,
			labels: labels.map((label) => label.id),
		}).then(() => {
			getBoard();
		});
		closeHandler();
	};

	return (
		<>
			<div
				className={`post-overlay ${closing && "closing"}`}
				onClick={closeHandler}
			></div>
			<div className={`post post-create ${closing && "closing"}`}>
				<div className="post__header">
					<div className="post__header__title">New post</div>
					<IoCloseOutline
						className="post__header__close"
						onClick={closeHandler}
					/>
				</div>

				<div className="post__body">
					<Form onSubmit={createPost} submitLabel="Create">
						<input
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<textarea
							name=""
							id=""
							cols="30"
							rows="10"
							placeholder="What's on your mind?"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						></textarea>
						<div className="post-create__labels">
							<div
								className="post-create__labels__label new"
								onMouseEnter={openlabelsDropdown}
								onMouseLeave={closelabelsDropdown}
							>
								Add label
								<div
									className="post-create__labels__label__dropdown"
									ref={labelsDropdownRef}
									style={{
										height: labelsDropdownHeight,
									}}
								>
									{space.labels.map((label, key) => (
										<div
											key={key}
											className={`post-create__labels__label__dropdown__item ${
												labels.includes(label) &&
												"active"
											}`}
											onClick={() => {
												toggleLabel(label);
											}}
										>
											{label.name}
										</div>
									))}
								</div>
							</div>
							{labels.map((label, key) => (
								<div
									key={key}
									className="post-create__labels__label"
								>
									{label.name}
								</div>
							))}
						</div>
					</Form>
				</div>
			</div>
		</>
	);
};

export default PostCreate;
