craete table items{
    item_id bigserial primary key,
    item_name text,
    price float,
    years_used float,
    item_message text,x
    fk_user_id int,
    
    img_url text,
};
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
create table admins{
    admin_id bigserial primary key,
    username text,
    password text,
    created_at timestamp
};
create table reports{
    report_id bigserial primary key,
    user_id int,
    reason text,
    sent_at timestamp,
};
    