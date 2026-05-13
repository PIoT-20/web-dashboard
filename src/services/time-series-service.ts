import axios from 'axios'

const qisAddress = import.meta.env.VITE_QIS_URL

export async function getQisReadings(
  client_id: string,
  start_time: string,
  end_time: string,
): Promise<string> {

  return axios
    .get(`${qisAddress}/?user_id=${client_id}\&start_time=${start_time}\&end_time=${end_time}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw `cannot fetch QIS ${err}`
    })
}
