
import Modal from 'react-bootstrap/esm/Modal';
import LoaderButton from '../Button/LoaderButton';
import Button from 'react-bootstrap/esm/Button';

interface IProps {
    message: string;
    submitHandler: () => void;
    closeHandler: () => void;
    submitLoading: boolean;
}

const DeletePopup = (props: IProps) => {
    const { message, submitHandler, closeHandler, submitLoading } = props;

    return <Modal show={true} onHide={closeHandler}>
        <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={closeHandler}>
                No
            </Button>
            <LoaderButton text='Yes' isLoading={submitLoading} variant="primary" onClick={submitHandler} />
        </Modal.Footer>
    </Modal>
}

export default DeletePopup;