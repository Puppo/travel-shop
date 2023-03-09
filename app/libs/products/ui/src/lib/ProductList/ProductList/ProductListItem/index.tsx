
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Price } from "@travel-shop-app/shared/ui";
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from "react-router-dom";

import placeHolderImage from './placeholder.jpeg';


import { Product } from "@travel-shop-app/products/models";

interface ProductListItemProps {
  item: Product;
}

export function ProductListItem({ item }: ProductListItemProps) {
  const { t } = useTranslation(['common'])

  return <Box component="li" sx={{
    all: "unset"
  }}>
    <Card sx={{
      borderRadius: 0,
      marginBottom: '5px',
      display: 'flex',
      flexDirection: 'row',
    }}>
      <LazyLoadImage
        loading='lazy'
        width='150px'
        height='150px'
        effect='blur'
        placeholderSrc={placeHolderImage}
        style={{ height: 'auto', objectFit: 'cover' }}
        srcSet={item.image}
        decoding='async'
        alt={item.title}
      />
      <CardContent sx={{
        flex: 1
      }}>
        <Typography gutterBottom variant="h6" component="div">
          <LinesEllipsis
            text={item.title}
            maxLine='1'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          <Price value={item.price} />
        </Typography>
        <Typography component="div" variant="body2" color="text.secondary">
          <LinesEllipsis
            text={item.description}
            maxLine='2'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/products/${item.id}`} size="small" color="primary">
          {t('products.more')}
        </Button>
      </CardActions>
    </Card>
  </Box>

}