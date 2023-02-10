import styled from '@emotion/styled';
import { Fragment } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

const sortList = [
  {
    id: 'new',
    name: '최신순',
  },
  {
    id: 'click',
    name: '조회순',
  },
  {
    id: 'reply',
    name: '댓글 많은 순',
  },
];

const Sort = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category') || '';

  const searchValue = searchParams.get('q') || '';
  const sort = searchParams.get('sort');

  const handleSort = (value: string) => {
    const id = value === sort ? 'selected' : undefined;

    return id;
  };

  return (
    <SortContainer>
      {sortList.map(({ id, name }) => (
        <Fragment key={id}>
          <SortList
            id={handleSort(id)}
            onClick={() =>
              navigate(ROUTES.STREET.DETAIL(category, id, searchValue))
            }>
            {name}
          </SortList>
          <SortList id={id}>|</SortList>
        </Fragment>
      ))}
    </SortContainer>
  );
};

export default Sort;

const SortContainer = styled.ul`
  margin-left: auto;
  display: flex;
  font-size: 13px;
  color: #a3a3a3;
  font-weight: 400;
  gap: 15px;
`;
const SortList = styled.li`
  cursor: pointer;
  &:hover {
    color: #000;
  }
  &#selected {
    color: #000;
    font-weight: 600;
  }
  &#reply {
    display: none;
  }
`;
