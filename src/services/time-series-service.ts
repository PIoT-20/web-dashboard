import axios from 'axios'

export async function getQisReadings(
  client_id: string,
  start_time: string,
  end_time: string,
): Promise<string> {
  const qisAddress = process.env.QIS_ADDRESS
  return axios
    .get(`${qisAddress}/client_id=${client_id}&start_time=${start_time}&end_time=${end_time}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw `cannot fetch QIS ${err}`
    })
}
