import Box from "components/Box";
import Typography from "components/Typography";
import { FC } from "react";
import { colors } from "theme/colors";

export type CompanyStatusType = {
  title?: string;
  color?: keyof typeof colors;
  label?: string;
  description?: string;
};

const CompanyStatus: FC<CompanyStatusType> = ({
  title,
  color,
  label,
  description,
}) => {
  return (
    <Box flexGrow={1}>
      <Typography variant='h5'>{title}</Typography>
      <Box flexDirection='row' pt={4} alignItems='center'>
        <Box height={8} width={8} br={4} bg={color} mr={8} />
        <Typography variant='h5' color={color}>
          {label}
        </Typography>
        {description ? (
          <Box height={4} width={4} br={2} mx={6} bg='dark' />
        ) : null}
        <Typography variant='h5'>{description}</Typography>
      </Box>
    </Box>
  );
};

export default CompanyStatus;
