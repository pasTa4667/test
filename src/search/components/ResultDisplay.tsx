import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { Product } from '../../shared/definitions';

interface ResultDisplayProps {
  isLoading: boolean;
  products: Product[];
  onProductClick: (index: number) => void;
}

export default function ResultDisplay(props: ResultDisplayProps) {
  return (
    <div className="result-container">
      {!props.isLoading
      ? props.products.map((product, index) => (
          <div key={index}>
            <div className="result-item" onClick={() => props.onProductClick(index)} style={{ cursor: "pointer"}}>
              <img
                src="logo192.png"
                alt="Image"
                onError={(e) => (e.currentTarget.src = "logo192.png")}
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "white",
                }}
              />
              <div className="result-content">
                <span className='result-header'>{product.name}</span>
                <div>
                  <span>Price: {product.price} $</span>
                  <br />
                  <span>UPC: {product.upc}</span>
                  <br />
                  <span>EAN: {product.ean}</span>
                </div>
                <div>
                  <span>Price: {product.price} $</span>
                  <br />
                  <span>UPC: {product.upc}</span>
                  <br />
                  <span>EAN: {product.ean}</span>
                </div>
              </div>
            </div>
            <hr />
          </div>))
      : <LoadingSkeleton count={7}/>
    }
    </div>
  );
}

export function LoadingSkeleton(props: { count: number }) {
  return (
    <div>
      {Array.from({ length: props.count }, (v, i) => i).map((value) => (
        <div key={value}>
          <div className="result-item">
            <Skeleton
              style={{ width: "80px", height: "80px", backgroundColor: "white" }}
            />
            <div style={{ width: "100%"}}>
              <Skeleton style={{width: "30%"}}/>
              <Skeleton count={3} />
            </div>
          </div>
          <hr/>
        </div>
      ))}   
    </div>
  );
}
