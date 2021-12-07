import { Container } from './styles';
import incoming from '../../assets/income.svg';
import outcoming from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

export function Summary() {
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incoming} alt='up-arrow' />
        </header>
        <strong>1000</strong>
      </div>

      <div>
        <header>
          <p>Saidas</p>
          <img src={outcoming} alt='up-arrow' />
        </header>
        <strong>- 500</strong>
      </div>

      <div>
        <header>
          <p>Total</p>
          <img src={total} alt='up-arrow' />
        </header>
        <strong>500</strong>
      </div>
    </Container>
  )
}