import React  from 'react'
import { lazy,Suspense } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import UserProfile from './components/UserProfile'
// dynamic import of components
import AdminSignIn from './components/AdminSignIn'
import Articles from './components/Articles'
import AuthorProfile from './components/AuthorProfile'
// import AddArticle from './components/AddArticle'
import ArticlesByAuthor from './components/ArticlesByAuthor'
import Article from './components/Article'
import { Navigate } from 'react-router-dom'
import RoutingError from './components/Routingerror'
import Adminprofile from './components/Adminprofile'
import Adminarticles from './components/Adminarticles'
import AdminUsersList from './components/AdminUsersList'
import AdminAuthorList from './components/AdminAuthorList'
import AdminArticle from './components/AdminArticle'
const AddArticle=lazy(()=>import ('./components/AddArticle'))
function App() {
  let router =createBrowserRouter([{
    path:'',
    errorElement:<RoutingError/>,
    element:<RootLayout/>,
    children:[{
      path:'',
      element:<Home/>
    },
  {
    path:'signup',
    element:<SignUp/>
  },
  {
      path:'signin',
      element:<SignIn/>
  },
  {
         path:'adminsignin',
         element:<AdminSignIn/>
  },
  {
      path:'Admin-profile',
      element:<Adminprofile/>,
      children:[{
        path:'adminarticles',
        element:<Adminarticles/>
      },
      {
          path:'',
          element:<Navigate to="adminuserlist" />
      },
      {
        path:'adminuserlist',
        element:<AdminUsersList/>
      },
      {
        path:'adminauthorlist',
        element:<AdminAuthorList/>
      },
      {
        path:'article/:articleId',
        element:<AdminArticle/>
      },
      
    ]
  },
  {
      path:'user-profile',
      element:<UserProfile/>,
      children:[{
        path:'articles',
        element:<Articles/>
      },
      {
           path:'',
           element:<Navigate to="articles" />
      },
      {
        path:'article/:articleId',
        element:<Article/>
      }]
  },
  {
    path:'author-profile',
    element:<AuthorProfile/>,
    children: [
      {
        path: 'articles-by-author/:author', // dynamic route
        element: <ArticlesByAuthor/>
      },
      {
        path:'article/:articleId',
        element:<Article/>
      },
      {
        path: 'new-article',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddArticle />
          </Suspense>
        )
      },
      {
        path:'',
        element:<Navigate to="articles-by-author/:author" />
      }
    ]
  }

  ]
  }])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App