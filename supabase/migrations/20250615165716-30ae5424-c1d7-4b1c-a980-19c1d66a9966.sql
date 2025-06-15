
-- Criação da tabela portfolio_items para armazenar os portfólios exibidos na seção do site
CREATE TABLE public.portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  img TEXT NOT NULL,
  alt TEXT NOT NULL,
  link TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Inserindo os portfólios já exibidos atualmente na grade (8 itens)
INSERT INTO public.portfolio_items (img, alt, link) VALUES
('/public/lovable-uploads/photo-1488590528505-98d2b5aba04b', 'Laptop workspace designer', 'https://www.behance.net/maxdemian/project1'),
('/public/lovable-uploads/photo-1461749280684-dccba630e2f6', 'Java code on monitor', 'https://www.behance.net/maxdemian/project2'),
('/public/lovable-uploads/photo-1486312338219-ce68d2c6f44d', 'Person using MacBook Pro', 'https://www.behance.net/maxdemian/project3'),
('/public/lovable-uploads/photo-1581091226825-a6a2a5aee158', 'Woman using laptop', 'https://www.behance.net/maxdemian/project4'),
('/public/lovable-uploads/photo-1487058792275-0ad4aaf24ca7', 'Monitor with code', 'https://www.behance.net/maxdemian/project5'),
('/public/lovable-uploads/photo-1498050108023-c5249f4df085', 'MacBook with code', 'https://www.behance.net/maxdemian/project6'),
('/public/lovable-uploads/1f92fddb-352c-44f3-a639-ab30f54cd665.jpg', 'Design mockup', 'https://www.behance.net/maxdemian/project7'),
('/public/lovable-uploads/b5362a7a-ef6f-46c7-ac27-99fa2fcde1f1.jpg', 'Brand identity', 'https://www.behance.net/maxdemian/project8');
