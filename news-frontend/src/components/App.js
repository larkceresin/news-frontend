import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';
import About from './about/About';
import Footer from './footer/Footer';
import Main from './main/Main';
import RegistrationComplete from './popout/RegistrationComplete';
import SignInPopout from './popout/form/SignInPopout';
import SignUpPopout from './popout/form/SignUpPopout';
import NewsCardList from './results/NewsCardList';
import Preloader from './results/Preloader';
import NoResults from './results/NoResults';
import SavedNews from './saved/SavedNews';
import ResultError from './results/ResultError';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import newsApi from '../utils/API/news-api';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isRegistrationCompleteOpen, setisRegistrationCompleteOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [cards, setCards] = useState([]);
  const [results, setResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [resultError, setResultError] = useState(false);
  const [userToken, setUserToken] = useState('');
  const history = useHistory()

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      let token = localStorage.getItem('jwt')
      setUserToken(token)
      auth.checkToken(token)
        .then(res => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch(err => console.log(err))
    }
  }, [])

  function openSignIn() {
    setIsSignUpOpen(false);
    setisRegistrationCompleteOpen(false);
    setIsSignInOpen(true);
  }
  function openSignUp() {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
  }
  function openSuccess() {
    setisRegistrationCompleteOpen(true);
  }
  function closeAll(e) {
    if (e.target !== e.currentTarget) return
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
    setisRegistrationCompleteOpen(false);
  }
  window.addEventListener('keydown', (e) => {
    if (e.code === "Escape") {
      setIsSignInOpen(false);
      setIsSignUpOpen(false);
      setisRegistrationCompleteOpen(false);
    } return
  })
  function signInSubmit({ email, password }) {
    auth.authorize(password, email)
      .then(res => {
        if (res.token) {
          setUserToken(res.token)
        }
      })
      .then(() => {
        auth.checkToken(userToken)
          .then(res => {
            setCurrentUser(res)
            setLoggedIn(true)
          })
      })
      .then(() => {
        setIsSignInOpen(false)
      })
      .catch(err => console.log(err))
  }
  function signUpSubmit({ email, password, name }) {
    auth.register(email, password, name)
      .then(() => {
        setIsSignUpOpen(false);
        openSuccess();
      })
      .catch(err => console.log(err))

  }
  function logout() {
    setLoggedIn(false);
    setCurrentUser({})
    localStorage.removeItem('jwt');
    history.push('/')
  }
  function search(keyword) {
    setKeyword(keyword)
    setNoResults(false)
    setResultError(false)
    setResults(false)
    setLoading(true)
    newsApi.getArticles(keyword)
      .then(res => {
        setCards(res)
        setLoading(false);
        if (res.length === 0) {
          setNoResults(true)
        } else {
          setNoResults(false);
          setResults(true);
        }
      })
    
      .catch((err) => {
        setLoading(false);
        setResultError(true);
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Switch>
        <Route exact path="/">
          <Main headerClick={loggedIn ? logout : openSignIn} loggedIn={loggedIn} search={search} />
          {results ? <NewsCardList cards={cards} keyword={keyword} loggedIn={loggedIn} hoverText="Sign in to save articles" /> : ''}
          {noResults ? <NoResults /> : ''}
          {loading ? <Preloader /> : ''}
          {resultError ? <ResultError /> : ''}
          <About />
        </Route>
        <ProtectedRoute
          path="/saved-news"
          loggedIn={loggedIn}
          component={SavedNews}
          headerClick={logout}
          signInDirect={openSignIn}
        />
        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>

      <Footer />
      <RegistrationComplete isOpen={isRegistrationCompleteOpen} linkClick={openSignIn} onClose={closeAll} />
      <SignInPopout isSignInOpen={isSignInOpen} onClose={closeAll} handleSubmit={signInSubmit} linkClick={openSignUp} />
      <SignUpPopout isSignUpOpen={isSignUpOpen} onClose={closeAll} handleSubmit={signUpSubmit} linkClick={openSignIn} />

    </CurrentUserContext.Provider>
  );
}

export default App;
