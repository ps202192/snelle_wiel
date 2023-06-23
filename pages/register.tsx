import axios from "axios";
import React, {useState} from "react";

const Home = () => {
    const [account, setAccount] = useState({})
    async function maakAccount(){
        let bericht = ""
        const {naam, achternaam, email, plaats, postcode, wachtwoord, gebruikersnaam} = account
        if(naam == "" || !naam) bericht += "Vull naam in\n"
        if(achternaam == "" || !achternaam) bericht += "Vull achternaam in\n"
        if(email == "" || !email) bericht += "Vull email in\n"
        if(plaats == "" || !plaats) bericht += "Vull telefoonnummer in\n"
        if(postcode == "" || !postcode) bericht += "Vull adminrechten in\n"
        if(wachtwoord == "" || !wachtwoord) bericht += "Vull wachtwoord in\n"
        if(gebruikersnaam == "" || !gebruikersnaam) bericht += "Vull username in\n"
        if(bericht == ""){
            const data = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/klanten`, {account});
            location.href = "/login"
        }
        else{
            alert(bericht)
        }
        
    }
  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://img.freepik.com/iconen-gratis/zwaaiende-hand_318-817147.jpg" alt="logo"/>
          GroeneVingers    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Maak een account aan
              </h1>
              <div className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label for="gebruikersnaam" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gebruikersnaam</label>
                      <input type="gebruikersnaam" name="gebruikersnaam" id="gebruikersnaam" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Gebruikersnaam" required=""
                      onChange={(e) => {
                        let updatedValue = {gebruikersnaam: e.target.value};
                        setAccount(account => ({
                            ...account,
                            ...updatedValue
                          }))
                        } 
                        }
                      />
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="naam@voorbeeld.com" required=""
                      onChange={(e) => {
                        let updatedValue = {email: e.target.value};
                        setAccount(account => ({
                            ...account,
                            ...updatedValue
                          }))
                        } 
                        }/>
                  </div>
                  <div>
                      <label for="wachtwoord" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wachtwoord</label>
                      <input type="password" name="wachtwoord" id="wachtwoord" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                      onChange={(e) => {
                        let updatedValue = {wachtwoord: e.target.value};
                        setAccount(account => ({
                            ...account,
                            ...updatedValue
                          }))
                        } 
                        }/>
                  </div>
                  <div>
                      <label for="naam" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Naam</label>
                      <input type="text" name="naam" id="naam" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Naam" required=""
                      onChange={(e) => {
                        let updatedValue = {naam: e.target.value};
                        setAccount(account => ({
                            ...account,
                            ...updatedValue
                          }))
                        } 
                        }/>
                  </div>
                  <div>
                      <label for="achternaam" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Achternaam</label>
                      <input type="text" name="achternaam" id="achternaam" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Achternaam" required=""
                      onChange={(e) => {
                        let updatedValue = {achternaam: e.target.value};
                        setAccount(account => ({
                            ...account,
                            ...updatedValue
                          }))
                        } 
                        }/>
                  </div>
                  <div>
                      <label for="postcode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postcode</label>
                      <input type="text" name="postcode" id="postcode" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Postcode" required=""
                      onChange={(e) => {
                        let updatedValue = {postcode: e.target.value};
                        setAccount(account => ({
                            ...account,
                            ...updatedValue
                          }))
                        } 
                        }/>
                  </div>
                  <div>
                      <label for="plaats" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plaats</label>
                      <input type="text" name="plaats" id="plaats" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Plaats" required=""
                      onChange={(e) => {
                        let updatedValue = {plaats: e.target.value};
                        setAccount(account => ({
                            ...account,
                            ...updatedValue
                          }))
                        } 
                        }/>
                  </div>
                  <button type="submit" className="w-full text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={maakAccount}>Maak je account aan</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Al een account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log hier in</a>
                  </p>
              </div>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default Home;