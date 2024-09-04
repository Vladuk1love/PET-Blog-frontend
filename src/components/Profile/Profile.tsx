import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import GoBackward from "../GoBackward/GoBackward";
import {
  useGetByAuthorQuery,
  useGetPostsCountQuery,
} from "../../redux/posts/postsApi";
import PostMini from "../PostMini/PostMini";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import PaginationBar from "../MainPosts/PaginationBar/PaginationBar";
import Loading from "../Loading/Loading";
import adder from "../../public/image_add.png";
import { createPortal } from "react-dom";
import closeButton from "../../public/close_button.png";
import { useUpdateMeMutation } from "../../redux/user/userApi";
import { useActions } from "../../hooks/useActions";

function Profile() {
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const userId = useTypedSelector((state) => state.user.user?._id);
  const userData = useTypedSelector((state) => state.user.user);
  const { data, isLoading } = useGetByAuthorQuery({
    authorId: userId!,
    page: page,
  });
  const { data: postCount } = useGetPostsCountQuery("");
  const [showImageAdder, setShowImageAdder] = useState(false);

  return userData ? (
    <div>
      {modalOpen && <Modal modalOpen={modalOpen} setOpen={setModalOpen} />}
      <GoBackward to={""} />
      <div className={styles.profile_container}>
        <div className={styles.personal_info_container}>
          <div
            className={styles.personal_info_container_image}
            onMouseEnter={() => setShowImageAdder(true)}
            onMouseLeave={() => setShowImageAdder(false)}
            onClick={() => setModalOpen(true)}
          >
            {showImageAdder && (
              <div className={styles.personal_info_container_image_adder}>
                <img src={adder} alt="" />
              </div>
            )}
            <img src={userData.avatarUrl} alt="" />
          </div>
          <p className={styles.personal_info_container_title}>
            {userData.fullName}
          </p>
          <p className={styles.personal_info_container_main}>
            <span>образование: </span>
            {"ne ykazano"}
          </p>
          <p className={styles.personal_info_container_main}>
            <span>возраст: </span>
            {"ne ykazano"}
          </p>
          <p className={styles.personal_info_container_main}>
            <span>популярные теги: </span>
            {"ne ykazano"}
          </p>
        </div>
        <div className={styles.author_posts_container}>
          <div className={styles.author_posts_container_header}>
            <p>статьи автора</p>
          </div>
          <div className={styles.author_posts}>
            {isLoading && <Loading />}
            {data &&
              data.map((post) => {
                return (
                  <PostMini
                    _id={post._id}
                    title={post.title}
                    authorName={"Это ваша статья"}
                    tags={post.tags}
                    imageUrl={post.imageUrl}
                    text={post.text}
                    scale={0.8}
                  />
                );
              })}
          </div>
          <hr style={{ height: "1px" }} />
          {data?.length !== 0 && (
            <PaginationBar
              page={page}
              setPage={setPage}
              postsCount={postCount!}
              scale={0.9}
              postLimit={5}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

interface IModal {
  modalOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal(props: IModal) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [imgUrlInput, setImgUrlInput] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const { updateState } = useActions();
  const [
    update,
    { error: photoUploadErr, isLoading, data: photoUploadResponse },
  ] = useUpdateMeMutation();

  useEffect(() => {
    if (photoUploadResponse) {
      updateState(photoUploadResponse);
      props.setOpen(false);
    }
  }, [photoUploadResponse]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dialogRef.current) {
        dialogRef.current.close();
        props.setOpen(false); // Update the state when closed
      }
    };
    if (props.modalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      dialogRef.current?.showModal();
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      dialogRef.current?.close();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.modalOpen]);

  useEffect(() => {
    const checkImage = async () => {
      const imageRegex =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
      if (imageRegex.test(imgUrlInput)) {
        try {
          const response = await fetch(imgUrlInput);
          if (response) {
            setIsValid(true);
            setError("");
          } else {
            setError("Неверный URL картинки");
            console.log(error);
          }
        } catch (error) {
          setError("Не удалось получить доступ к картинке");
          console.log(error);
        }
      } else {
        setError("Введите корректный Url");
      }
    };

    if (imgUrlInput) {
      checkImage();
    }
  }, [imgUrlInput]);

  return createPortal(
    <dialog className={styles.modal_container} ref={dialogRef}>
      <button
        className={styles.modal_close_button}
        onClick={() => props.setOpen(false)}
      >
        <img src={closeButton} alt="x" width={"45px"} height={"45px"} />
      </button>
      <p className={styles.modal_title}>Введите URL изображения:</p>
      <form
        action={"submit"}
        onSubmit={(event) => {
          event.preventDefault();
          update({ avatarUrl: imgUrlInput });
        }}
        className={styles.modal_form}
      >
        <input
          type="text"
          value={imgUrlInput}
          onChange={(event) => setImgUrlInput(event.target.value)}
          className={styles.modal_form_input}
          placeholder={"URL"}
        />
        <button className={styles.modal_form_button} disabled={!isValid}>
          сохранить
        </button>
      </form>
      {error && <p className={styles.modal_container_error}>{error}</p>}
    </dialog>,
    document.getElementById("modal") as Element
  );
}

export default Profile;
