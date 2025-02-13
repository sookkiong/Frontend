import styled from '@emotion/styled';

import useGetFlyerList from '../../hooks/useGetFlyerList';
import Loading from '../shared/Loading';
import Flyer from './Flyer';

const FlyerList = () => {
  const { data, isLoading, ref } = useGetFlyerList();
  const flyers = data?.pages;
  const hasResult = flyers?.find((data) => data.data)?.data; // 해당 전단지가 있는지 여부

  if (isLoading) return <Loading>전단지를 가져오는 중입니다</Loading>;
  return (
    <div>
      <FlyerContainer>
        {flyers?.map(({ data: flyer }) =>
          flyer.map(({ postId, title, tags, imgUrl }) => (
            <Flyer
              key={postId}
              postId={postId}
              title={title}
              tags={tags}
              imgUrl={imgUrl}
            />
          ))
        )}

        <div ref={ref} />
      </FlyerContainer>
      {hasResult?.length === 0 && (
        <NoneFlyer>해당하는 전단지가 없습니다 😭</NoneFlyer>
      )}
    </div>
  );
};

export default FlyerList;

const FlyerContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 65px;
  margin-top: 60px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;

const NoneFlyer = styled.div`
  width: 100%;
  height: 30vh;
  text-align: center;
  padding-top: 50px;
  font-size: 20px;
  font-weight: 400;
`;
