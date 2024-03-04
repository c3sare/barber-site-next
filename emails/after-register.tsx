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

interface AfterRegisterEmailProps {
  name: string;
  passcode: number;
}

export const AfterRegisterEmail = ({
  name,
  passcode,
}: AfterRegisterEmailProps) => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://barber-site-next.vercel.app/images/logo-black.png"
          width="456"
          height="100"
          alt="Koala"
          style={logo}
        />
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>Welcome to Barberia.</Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href={getBaseUrl() + "/confirm-email?passcode=" + passcode}
          >
            Confirm your email
          </Button>
        </Section>
        <Section style={{ textAlign: "center", padding: "8px 0" }}>or</Section>
        <Button style={button} href={getBaseUrl() + "/confirm-email"}>
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
        <Text style={footer}>
          470 Noor Ave STE B #1148, South San Francisco, CA 94080
        </Text>
      </Container>
    </Body>
  </Html>
);

AfterRegisterEmail.PreviewProps = {
  name: "Alan",
  passcode: 144833,
} as AfterRegisterEmailProps;

export default AfterRegisterEmail;

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

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
