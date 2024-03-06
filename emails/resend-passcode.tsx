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

interface ResendPasscodeProps {
  name: string;
  passcode: string;
  email: string;
}

export const ResendPasscodeEmail = ({
  name,
  passcode,
  email,
}: ResendPasscodeProps) => (
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
        <Text style={paragraph}>Here is your new passcode to verify.</Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href={`${getBaseUrl()}/verify?email=${email}&passcode=${passcode}`}
          >
            Confirm your email
          </Button>
        </Section>
        <Section style={{ textAlign: "center", padding: "8px 0" }}>or</Section>
        <Button style={button} href={`${getBaseUrl()}/verify?email=${email}`}>
          Enter the code below
        </Button>
        <Section style={codeContainer}>
          <Text style={code}>{passcode}</Text>
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

ResendPasscodeEmail.PreviewProps = {
  name: "Alan",
  passcode: "144833",
  email: "user@example.com",
} as ResendPasscodeProps;

export default ResendPasscodeEmail;

const codeContainer = {
  background: "rgba(0,0,0,.05)",
  borderRadius: "4px",
  margin: "16px auto 14px",
  verticalAlign: "middle",
  width: "280px",
};

const code = {
  color: "#000",
  display: "inline-block",
  fontFamily: "HelveticaNeue-Bold",
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "6px",
  lineHeight: "40px",
  paddingBottom: "8px",
  paddingTop: "8px",
  margin: "0 auto",
  width: "100%",
  textAlign: "center" as const,
};

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
