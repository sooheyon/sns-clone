import { useSession } from "next-auth/react";
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction } from "react";

interface CreateCommentFormProps {
  onSubmitCreateComment: (e: FormEvent) => Promise<void>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const CreateCommentForm: FC<CreateCommentFormProps> = ({
  onSubmitCreateComment,
  content,
  setContent,
}) => {
  const { data: session } = useSession();

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <form onSubmit={onSubmitCreateComment} className="flex flex-col">
      <textarea
        className="input-style resize-none h-20 pt-2 mt-4 w-full"
        value={content}
        onChange={onChangeContent}
        disabled={!session}
        placeholder={
          session ? "댓글을 작성하세요" : "로그인 후 댓글을 작성하세요"
        }
      />
      <input
        className={`btn-style self-end mt-2 w-fit ${
          !session && "text-gray-200 border-gray-200"
        }`}
        type="submit"
        value="댓글 생성"
        disabled={!session}
      />
    </form>
  );
};

export default CreateCommentForm;
