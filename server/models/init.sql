create table items(
    item_id serial primary key,
    item_name text,
    price float,
    years_used float,
    item_message text,
    fk_user_id int,
    uploaded_at Date,
    constraint fk_user_id FOREIGN KEY(fk_user_id) references users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
create table users(
    user_id serial primary key,
    user_name text,
    reg_no text,
    department text,
    current_year int ,
    email text,
    phone_no text,
    user_password text, 
    created_at Date,
);
create table admins(
    admin_id bigserial primary key,
    username text,
    password text,
    created_at timestamp
);
create table user_token(
    user_token_id SERIAL NOT NULL primary KEY,
    fk_user int,
    token varchar,
    created_at timestamp,
    updated_at timestamp,
    constraint fk_user FOREIGN KEY(fk_user) references users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
create table reports(
    report_id serial primary key,
    reason text,
    fk_item_id int,
    sent_at timestamp,
    constraint fk_item_id FOREIGN KEY (fk_item_id) references items(item_id) ON DELETE CASCADE ON UPDATE CASCADE
);