import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./Modal";
import userEvent from "@testing-library/user-event";

const onClose = jest.fn();

describe("Modal", () => {
  it("renders", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>This is a modal</div>
      </Modal>
    );
    const modal = screen.getByRole("dialog");
    expect(modal).toBeVisible();
  });

  it("shows children elements", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>This is a modal</div>
      </Modal>
    );
    const modalText = screen.getByText(/this is a modal/i);
    expect(modalText).toBeVisible();
  });

  it("is initially unnacesible", () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <div>This is a modal</div>
      </Modal>
    );

    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
  });

  it("renders headerText", () => {
    const modal = render(
      <Modal isOpen={true} onClose={onClose} headerText="This is the header">
        <div>This is a modal</div>
      </Modal>
    );

    const headerText = screen.getByText(/this is the header/i);
    expect(headerText).toBeVisible();
  });

  it("renders headerImage", () => {
    const modal = render(
      <Modal
        isOpen={true}
        onClose={onClose}
        headerImage="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Egypt.Giza.Sphinx.02.jpg/1920px-Egypt.Giza.Sphinx.02.jpg"
      >
        <div>This is a modal</div>
      </Modal>
    );

    const headerImg = screen.getByRole("img", { name: "header-image" });
    expect(headerImg).toBeVisible();
  });

  it("calls onClose function when close button is clicked", () => {
    render(
      <Modal isOpen={true} onClose={onClose} headerText="This is the header">
        <div>This is a modal</div>
      </Modal>
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
