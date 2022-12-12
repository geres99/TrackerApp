import Box from "components/Box";
import Typography from "components/Typography";
import { FC } from "react";
import { colors } from "theme/colors";

export type CompanyStatusType = {
  color: keyof typeof colors;
  label: string;
};

const CompanyStatus: FC<CompanyStatusType> = ({ color, label }) => {
  return (
    <Box flexDirection='row'>
      <Box width={16} height={16} br={8} bg={color} />
      <Typography>{label}</Typography>
    </Box>
  );
};

export default CompanyStatus;
