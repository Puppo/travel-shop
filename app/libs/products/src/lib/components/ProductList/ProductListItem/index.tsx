
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Product } from "../../../models";

import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Link } from "react-router-dom";
import styles from './index.module.scss';

interface ProductListItemProps {
  item: Product;
}

export function ProductListItem({ item }: ProductListItemProps) {
  const { t } = useTranslation(['common'])

  return <li className={styles['container']}>
    <Card sx={{
      borderRadius: 0,
      marginBottom: '5px'
    }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={item.image}
          alt={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
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