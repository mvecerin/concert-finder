import React from 'react';
import {
  Button,
  Modal as ModalBS,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import {useToggle} from '../hooks';
import {IConcert} from '../interfaces';
import {AddForm} from './AddForm';
import {EditForm} from './EditForm';
import {LogInForm} from './LogInForm';

const getForm = (formId: string, toggle: Function, concert?: IConcert) => {
  switch (formId) {
    case 'logIn':
      return <LogInForm />;
    case 'addForm':
      return <AddForm toggle={toggle!} />;
    case 'editForm':
      return <EditForm toggle={toggle!} concert={concert!} />;

    default:
      <></>;
  }
};

interface Props {
  modalLabel: string;
  formId: string;
  concert?: IConcert;
}

export const ShowModal = ({modalLabel, formId, concert}: Props) => {
  const [modal, toggle] = useToggle();

  return (
    <>
      <Button color="dark" className="me-2" onClick={toggle}>
        {modalLabel}
      </Button>
      <ModalBS isOpen={modal} toggle={toggle}>
        <ModalHeader className="bg-dark text-light">{modalLabel}</ModalHeader>
        <ModalBody>
          {concert ? getForm(formId, toggle, concert) : getForm(formId, toggle)}
        </ModalBody>
        <ModalFooter>
          <Button color="dark" type="submit" form={formId}>
            {modalLabel}
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalBS>
    </>
  );
};
