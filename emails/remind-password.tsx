import { getBaseUrl } from "@/lib/utils";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface RemindPasswordProps {
  name: string;
  userId: string;
  token: string;
}

export const RemindPasswordEmail = ({
  name,
  userId,
  token,
}: RemindPasswordProps) => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${getBaseUrl()}/images/logo-black.png`}
          width="456"
          height="100"
          alt="Barberia"
          style={logo}
        />
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          You can change password to your account by click on button below.
        </Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href={`${getBaseUrl()}/remind?id=${userId}&token=${token}`}
          >
            Confirm your email
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          Barberia team
        </Text>
        <Hr style={hr} />
      </Container>
    </Body>
  </Html>
);

RemindPasswordEmail.PreviewProps = {
  name: "Alan",
  userId: "144833",
  token: "daxxasd1231231asld",
} as RemindPasswordProps;

export default RemindPasswordEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
  filter: "invert(100%)",
  height: "auto",
  maxWidth: "100%",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};
