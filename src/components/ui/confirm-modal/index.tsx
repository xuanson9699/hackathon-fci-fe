import { Modal } from "antd";

interface DeleteModalProps {
  handleOk: () => void;
  handleCancel: () => void;
  title: string;
  children: React.ReactNode;
}
const ConfirmModal = ({
  handleOk,
  handleCancel,
  title = "",
  children,
}: DeleteModalProps) => {
  return (
    <Modal
      title={title}
      open
      onOk={handleOk}
      onCancel={handleCancel}
      okText={"Delete"}
      okButtonProps={{ danger: true }}
    >
      {children}
    </Modal>
  );
};
export default ConfirmModal;
