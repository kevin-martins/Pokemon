import Redirection from '../components/shared/Redirection'

const Error404 = (): JSX.Element => {
  return (
    <div className="w-1/3 m-auto">
      <h1 className="text-white text-5xl">Erreur 404</h1>
      <p className="text-white">Désolé, mais il semblerait que vous vous soyez perdu...</p>
      <button
        type="button"
        className=''
      >
        <Redirection to="/" className='' children="Retour à l'accueil" />
      </button>
    </div>
  )
}

export default Error404
