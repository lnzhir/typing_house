
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;



CREATE TABLE public.customers
(
	id bigserial primary key,
	first_name varchar(255) NOT NULL,
	sur_name varchar(255),
	last_name varchar(255),
	email varchar(255),
	password varchar(255),
	phone varchar(32)
);

CREATE TABLE public.categories
(
	id bigserial primary key,
	name varchar(255) NOT NULL,
	image varchar(255) NOT NULL,
	min_price float
);

CREATE TABLE public.products
(
	id bigserial primary key,
	category_id bigint references categories(id),
	price float,
	color varchar(64) NOT NULL,
	size varchar(64) NOT NULL
);

CREATE TABLE public.orders
(
	id bigserial primary key,
	date date not null,
	status integer,
	customer_id bigint references customers(id)
);

CREATE TABLE public.orderproducts
(
	product_id bigint references products(id),
	order_id bigint references orders(id),
	count integer,
	price float,

	PRIMARY KEY(product_id, order_id)
);

