-- Product photos were hotlinked from admin.apexpharma.io, which renamed its
-- uploads and now 404s on every old URL. The images are now served from
-- /public/images/products/<product id>.<ext> on each storefront.
--
-- Only rows still pointing at the dead host are touched, so images an admin
-- has since replaced via the product editor are left alone.

update public.products p
set image_url = v.image_url,
    updated_at = now()
from (values
  ('1',  '/images/products/1.webp'),
  ('2',  '/images/products/2.jpg'),
  ('3',  '/images/products/3.jpg'),
  ('4',  '/images/products/4.jpg'),
  ('5',  '/images/products/5.jpg'),
  ('6',  '/images/products/6.webp'),
  ('7',  '/images/products/7.webp'),
  ('8',  '/images/products/8.webp'),
  ('9',  '/images/products/9.jpg'),
  ('10', '/images/products/10.webp'),
  ('11', '/images/products/11.jpg'),
  ('12', '/images/products/12.webp'),
  ('13', '/images/products/13.webp'),
  ('14', '/images/products/14.webp'),
  ('15', '/images/products/15.webp'),
  ('16', '/images/products/16.webp'),
  ('17', '/images/products/17.jpg'),
  ('18', '/images/products/18.jpg'),
  ('19', '/images/products/19.webp'),
  ('20', '/images/products/20.jpg'),
  ('21', '/images/products/21.jpg'),
  ('22', '/images/products/22.webp')
) as v(id, image_url)
where p.id = v.id
  and p.image_url like 'https://admin.apexpharma.io/%';
