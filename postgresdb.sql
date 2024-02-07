PGDMP  '    0                |            postgres    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    5    postgres    DATABASE     �   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE postgres;
                postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    4793                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            �           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            �            1259    347851    Products    TABLE     d  CREATE TABLE public."Products" (
    id uuid NOT NULL,
    "productName" character varying(255) NOT NULL,
    "productDetails" character varying(255) NOT NULL,
    "productAvailable" boolean NOT NULL,
    "productRate" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Products";
       public         heap    postgres    false            �            1259    347858    Users    TABLE     e  CREATE TABLE public."Users" (
    id uuid NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'USER'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �          0    347851    Products 
   TABLE DATA           �   COPY public."Products" (id, "productName", "productDetails", "productAvailable", "productRate", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   "       �          0    347858    Users 
   TABLE DATA           _   COPY public."Users" (id, username, password, name, role, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   �                   2606    347857    Products Products_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_pkey";
       public            postgres    false    216            "           2606    347865    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    217            �   v  x�}�?�� �k�)�:a���*R�]��?�]K^cag���q6�v����fc(iH�I8��%�-��\�%v-q��Ma�u�g��:�%�p.3_jI��T��q��T��_���T_.e&>���0��tbSr_$�� dǥ�z�Z�����������(u'�jНwѲ��_ޗ9�2f���k)�ez��G�Q�y\�)����#3�v����&*�`�I�'�VxړŌ#��]�ϗP�Tٷ{�<�o����u����զ3	��� �@^� Rd��C�~������s=����̱ۣ��P�{�����pz�E�C��ɨ�װle�8E�����!��x@T/u��O�+��z�w��m�4� i��?      �     x�}νn�0@�9y��*�k�p�
	T ���Ŏ�B*~��]*�v>���4"
�90L"# ���%�͍�-��+u��YUz�4�� �.Ԕ�~T�er����M�r��m�O���+��ocmn|�4�f^'�G��H��m������n���7���c�2�T�����e:��G΄���O}_'Q�^�E|Z����*�ε��NG�Z��yQ��LjV�g�]q<O��7{�M�a�\�_�_���� �hcs     