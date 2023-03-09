import styled from '@emotion/styled';
import { useState } from 'react';

import { COLORS } from '../../constants/colors';
import useGetComments from '../../hooks/useGetComments';
import { CommentsProps } from '../../interfaces/comment';
import Comment from './Comment';

const Comments = ({
  postId,
  rows,
  setRows,
  rowsBottom,
  setRowsBottom,
}: CommentsProps) => {
  const { comments, isLoading } = useGetComments(postId);
  const [commentInput, setCommentInput] = useState<string>('');
  const [commentInputBottom, setCommentInputBottom] = useState<string>('');

  const handleRows = rows ? 7 : 1;
  const handleRowsBottom = rowsBottom ? 7 : 1;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && confirm('댓글을 등록하시겠습니까?')) {
      setCommentInput('');
      setRows(false);
      alert('댓글이 등록되었습니다!');
    }
  };
  const handleSubmit = () => {
    if (confirm('댓글을 등록하시겠습니까?')) {
      setCommentInput('');
      setRows(false);
      alert('댓글이 등록되었습니다!');
    }
  };
  const handleKeyDownBottom = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && confirm('댓글을 등록하시겠습니까?')) {
      setCommentInputBottom('');
      setRowsBottom(false);
      alert('댓글이 등록되었습니다!');
    }
  };
  const handleSubmitBottom = () => {
    if (confirm('댓글을 등록하시겠습니까?')) {
      setCommentInputBottom('');
      setRowsBottom(false);
      alert('댓글이 등록되었습니다!');
    }
  };

  const handleInputLength = () => {
    return commentInput.length === 0 || commentInput.length === 301
      ? true
      : false;
  };
  const handleInputLengthBottom = () => {
    return commentInputBottom.length === 0 || commentInputBottom.length === 301
      ? true
      : false;
  };

  return (
    <CommentContainer>
      <Text id='total'>
        댓글
        <span style={{ color: `${COLORS.MAIN}`, fontWeight: '600' }}>
          &nbsp;{comments?.length || 0}
        </span>
      </Text>

      {/* 댓글 입력창(top) */}
      <ReplyTextAreaWrap
        onClick={(e) => {
          e.stopPropagation();
          setRows(true);
        }}>
        <ReplyTextArea
          placeholder='댓글을 입력해주세요'
          rows={handleRows}
          value={commentInput}
          maxLength={301}
          onClick={(e) => {
            e.stopPropagation();
            setRows(true);
          }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCommentInput(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        {rows ? (
          <NumNSubmit>
            <TextNum>
              <NowTextNum>{commentInput.length}</NowTextNum>/300
            </TextNum>
            <SubmitReplyButton
              disabled={handleInputLength()}
              onClick={(e) => {
                e.stopPropagation();
                handleSubmit();
              }}>
              등록
            </SubmitReplyButton>
          </NumNSubmit>
        ) : undefined}
      </ReplyTextAreaWrap>

      {/* 입력된 댓글들(parent) */}
      {comments?.map(
        ({
          commentId,
          name,
          content,
          createdDate,
          childComments,
          isCommentWriter,
        }) => (
          <Comment
            key={commentId}
            commentId={commentId}
            name={name}
            content={content}
            createdDate={createdDate}
            childComments={childComments}
            isCommentWriter={isCommentWriter}
          />
        )
      )}

      {/* 댓글 입력창 (bottom) */}
      {comments?.length !== 0 ? (
        <ReplyTextAreaWrap
          id='bottom'
          onClick={(e) => {
            e.stopPropagation();
            setRowsBottom(true);
          }}>
          <ReplyTextArea
            placeholder='댓글을 입력해주세요'
            rows={handleRowsBottom}
            value={commentInputBottom}
            maxLength={301}
            onClick={(e) => {
              e.stopPropagation();
              setRowsBottom(true);
            }}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setCommentInputBottom(e.target.value);
            }}
            onKeyDown={handleKeyDownBottom}
          />
          {rowsBottom ? (
            <NumNSubmit>
              <TextNum>
                <NowTextNum>{commentInputBottom.length}</NowTextNum>/300
              </TextNum>
              <SubmitReplyButton
                disabled={handleInputLengthBottom()}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubmitBottom();
                }}>
                등록
              </SubmitReplyButton>
            </NumNSubmit>
          ) : undefined}
        </ReplyTextAreaWrap>
      ) : (
        <div
          style={{
            padding: '60px 0 20px',
            fontWeight: '400',
            color: '#616161',
            fontSize: '15px',
            textAlign: 'center',
            lineHeight: '1.4',
            width: '100%',
          }}>
          <div style={{ marginBottom: '34px' }}>
            <img src='/img/thinking.png' width={100} />
          </div>
          아직 댓글이 없어요 ㅠㅠ
          <br />첫 댓글을 남겨주세요!
        </div>
      )}
    </CommentContainer>
  );
};

export default Comments;

const ReplyTextAreaWrap = styled.div`
  position: relative;
  width: 100%;
  background: #e9e9e9;
  border-radius: 12px;
  &#bottom {
    margin-top: 20px;
  }
  @media screen and (max-width: 767px) {
    background: #fff;
  }
`;
const ReplyTextArea = styled.textarea`
  margin: 5px 0;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 400;
  padding: 16px 20px;
  box-sizing: border-box;
  background: #e9e9e9;
  @media screen and (max-width: 767px) {
    background: #fff;
  }
`;
export const NumNSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

export const TextNum = styled.div`
  padding: 10px 20px;
  font-weight: 400;
`;

export const NowTextNum = styled.span`
  font-weight: 600;
`;

export const SubmitReplyButton = styled.button`
  padding: 10px 30px;
  background-color: ${COLORS.MAIN};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 400;
  cursor: pointer;
  border: none;
  &:disabled {
    background: ${COLORS.GRAY};
    cursor: default;
  }
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  border-top: 1px solid #d9d9d9;
`;

const Text = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  margin-top: 20px;
  &#total {
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    padding: 20px 0;
  }
  &#date {
    font-size: 12px;
    color: #adadad;
  }
`;
