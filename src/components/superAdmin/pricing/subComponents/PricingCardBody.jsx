import { memo } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { useTheme } from '@mui/material/styles';
import Price from './Price';
import Ribbon from './Ribbon';
import LetUsTalk from './LetUsTalk';

const PricingCardBody = ({ styles, features, price, validity, isSpecialOffer, name, index, btnIndex }) => {
  const theme = useTheme();
  return (
    <>
      {isSpecialOffer ? <Ribbon styles={styles} /> : <Box sx={{ height: '100px', margin: '-16px' }}>&nbsp;</Box>}
      {name === 'Enterprise' ? <LetUsTalk /> : <Price price={price} validity={validity} index={index} btnIndex={btnIndex} />}

      <Typography component="p" variant="subtitle2" textAlign="left" color="#BDBDBD">
        What&apos;s Included:
      </Typography>
      {features.map((feature, index) => (
        <Stack key={index} direction="row" justifyContent="start" alignItems="center" my={1}>
          <VerifiedRoundedIcon
            sx={{
              color: theme.palette.primary.dark,
              width: '15px',
              height: '15px',
            }}
          />
          <Typography component="p" variant="caption" display="block" textAlign="left" ml={1}>
            {feature}
          </Typography>
        </Stack>
      ))}
    </>
  );
};

export default memo(PricingCardBody);
