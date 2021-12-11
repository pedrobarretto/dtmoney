import { useEffect } from "react";
import { Container } from "./styles";

export function TransactionTable() {
  useEffect(() => {
    fetch('http://localhost:3000/api/transactions')
    .then(res => res.json())
    .then(data => console.log(data));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de Sistema</td>
            <td className='deposit'>R$ 15.000,00</td>
            <td>Trabalho</td>
            <td>14/09/2021</td>
          </tr>
          <tr>
            <td>Conta de Luz</td>
            <td className='withdraw'>R$ - 150,00</td>
            <td>Casa</td>
            <td>20/09/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}