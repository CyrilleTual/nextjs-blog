import React from 'react'

type Params = {
  params: {
    slug: string;
  };
};


export default function CategoriesPage({params} : Params) {

  const {slug} = params; 
  return (
    <div>Page de la catégorie {slug}</div>
  )
}
