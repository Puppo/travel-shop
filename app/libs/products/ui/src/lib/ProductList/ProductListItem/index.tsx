
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Price } from "@travel-shop-app/shared/ui";
import { useTranslation } from 'react-i18next';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from "react-router-dom";

import { Product } from "@travel-shop-app/products/models";
import styles from './index.module.scss';

interface ProductListItemProps {
  item: Product;
}

export function ProductListItem({ item }: ProductListItemProps) {
  const { t } = useTranslation(['common'])

  return <li className={styles['container']}>
    <Card sx={{
      borderRadius: 0,
      marginBottom: '5px',
      display: 'flex',
      flexDirection: 'row',
    }}>
      <CardMedia
        component="img"
        sx={{
          width: '150px',
          height: '150px',
        }}
        image={item.image}
        alt={item.title}
      />
      <CardContent sx={{
        flex: 1
      }}>
        <Typography gutterBottom variant="h6" component="div">
          {item.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          <Price value={item.price} />
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
          height: '40px',
          overflow: 'hidden',
        }}>
          <LinesEllipsis
            text={item.description}
            maxLine='3'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />
        </Typography>
      </CardContent>
      <CardActions sx={{
        justifyContent: 'flex-end'
      }}>
        <Button component={Link} to={`/products/${item.id}`} size="small" color="primary">
          {t('more')}
        </Button>
      </CardActions>
    </Card>
  </li>

}