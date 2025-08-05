import { useState } from 'react';

import { Card, Col, Row, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import ConfirmModal from '@/components/ui/confirm-modal';
import PaginationControl from '@/components/ui/pagination-control';
import { formatDateTime } from '@/components/utils/date';
import { CentertItem } from '@/types';

// Interface for table data
interface CenterTableProps<T = any> {
  data?: CentertItem[];
  loading?: boolean;
  filterCondition: T;
  setFilterCondition?: (condition: T) => void;
  totalItem: number;
}

const CenterTable: React.FC<CenterTableProps> = (props) => {
  const {
    data = [],
    loading = false,
    filterCondition,
    setFilterCondition = () => {},
    totalItem = 0,
  } = props;

  const navigate = useNavigate();

  const [selectedDeleteId, setSelectedDeleteId] = useState('');

  const handleNavigate = (record: CentertItem) => {
    navigate(`/center/${record.id}`, {
      state: { fromListUrl: location.pathname + location.search },
    });
  };

  const handleDeleteItem = () => {};

  const handleCancelDelete = () => {
    setSelectedDeleteId('');
  };

  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        {data?.map((item) => {
          return (
            <StyledCol
              key={item.id}
              span={8}
              className="group flex transition-all duration-200 hover:shadow-lg hover:opacity-95 cursor-pointer"
              onClick={() => handleNavigate(item)}
            >
              <Card
                title={<a>{item.name}</a>}
                size="small"
                style={{ flex: 1 }}
                className="group-hover-card"
              >
                <div className="flex flex-col gap-2 p-2">
                  <Row className="b-bottom">
                    <Col span={8} className="text-secondary">
                      Members
                    </Col>
                    <Col span={16}>{item.member_number}</Col>
                  </Row>
                  <Row>
                    <Col span={8} className="text-secondary">
                      Projects
                    </Col>
                    <Col span={16}>{item.project_number}</Col>
                  </Row>
                </div>
              </Card>
            </StyledCol>
          );
        })}
      </Row>
      {!loading && (
        <PaginationControl
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          totalItem={totalItem}
        />
      )}
      {selectedDeleteId && (
        <ConfirmModal
          handleOk={handleDeleteItem}
          handleCancel={handleCancelDelete}
          title="Are you sure you want to delete this item?"
        >
          <></>
        </ConfirmModal>
      )}
    </Spin>
  );
};

export default CenterTable;

const StyledCol = styled(Col)`
  &:hover .ant-card-head {
    background-color: #e0f2fe;
    transition: background-color 0.3s;
  }
`;
