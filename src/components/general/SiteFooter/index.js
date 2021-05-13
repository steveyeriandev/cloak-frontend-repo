import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { useModal } from "react-modal-hook";
import { useSelector } from "react-redux";

import FormModal from "components/modals/Form";
import EmailForm from "components/forms/Email";
import { supportEmailUrl } from "features/emails/api";

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled.a`
  margin: 0 10px;
  color: ${(props) => props.theme.dark};
`;

const FooterButton = styled(Button)`
  margin: 0 10px;
  color: ${(props) => props.theme.dark};
  padding: 0;
  padding-bottom: 5px;
`;

function SiteFooter() {
  // Provides a footer with links to general information about the site/product.
  const isAuthenticated = useSelector((state) => state.account.token !== "");
  const [showContactModal, hideContactModal] = useModal(() => {
    return (
      <FormModal title="Contact us" onHide={hideContactModal}>
        <EmailForm
          closeModal={hideContactModal}
          email={{ to: "support@radhowtoschool.com" }}
          apiUrl={supportEmailUrl}
          toDisabled
        />
      </FormModal>
    );
  });

  return (
    <Wrapper>
      <div className="text-center">
        <StyledLink href="/privacy-policy" target="_blank" rel="noreferrer">
          Privacy Policy
        </StyledLink>
        <StyledLink href="/terms-of-use" target="_blank" rel="noreferrer">
          Terms of Use
        </StyledLink>
        {isAuthenticated && (
          <FooterButton variant="link" onClick={showContactModal}>
            Help/Feedback
          </FooterButton>
        )}
      </div>
      <div className="text-center">Rad How to School &#169;2021</div>
    </Wrapper>
  );
}

export default SiteFooter;
