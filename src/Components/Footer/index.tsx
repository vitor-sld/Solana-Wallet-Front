import { Link } from "react-router-dom";
import * as S from "./styles";

export function Footer() {
  return (
    <S.FooterWrapper>
      <S.Container>
        <S.Grid>
          {/* Brand */}
          <S.Brand>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ZVjMTys6STYDB0t4fhhg5UozJDxBAq.png"
                alt="Veilfi"
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
              <span>Veilfi</span>
            </div>
            <p>Private currency for everyone</p>
          </S.Brand>

          {/* Product */}
          <S.Section>
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#privacy">Security</a></li>
            </ul>
          </S.Section>

          {/* Resources */}
          <S.Section>
            <h4>Resources</h4>
            <ul>
              <li><S.LinkStyled  to="/Docs">Documentation</S.LinkStyled ></li>
              <li><S.LinkStyled  to="/Docs">API Reference</S.LinkStyled ></li>
            </ul>
          </S.Section>

          {/* Company */}
          <S.Section>
            <h4>Community</h4>
            <ul>
              <li><a href="https://x.com/veilfi?s=21">X</a></li>
              <li><a href="https://t.me/VeilFiApp">Telegram</a></li>
            </ul>
          </S.Section>
        </S.Grid>

        {/* Bottom Bar */}
        <S.BottomBar>
          <p>© 2025 Veilfi. All rights reserved.</p>

          <div className="links">

            <Link to="/Docs">Privacy Policy</Link>
            <Link to="/Docs">Terms of Service</Link>
            <Link to="/Docs">Cookie Policy</Link>
          </div>
        </S.BottomBar>
      </S.Container>
    </S.FooterWrapper>
  );
}
