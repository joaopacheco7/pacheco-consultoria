# Pacheco Consultoria — site estático

Site institucional da Pacheco Consultoria em **HTML, CSS e JavaScript** puros, pronto para hospedagem em **Amazon S3 + CloudFront**.

## Estrutura

```
├── index.html
├── css/styles.css
├── js/main.js
├── assets/images/
└── .github/workflows/deploy-s3.yml   # template (desativado até configurar secrets)
```

## Pré-visualizar localmente

Qualquer servidor estático serve. Exemplos:

```bash
# Python
python3 -m http.server 8080

# Node (se tiver npx)
npx serve .
```

Abra `http://localhost:8080`.

## O que mudou em relação ao site anterior

- Removida a assinatura da agência **Digital Bloom**
- Tipografia e layout refeitos (hero alinhado à esquerda, serviços em lista numerada, menos “cards”)
- Mesmas cores da marca (`#0A7947` / `#CDE146`) e logo oficial
- Conteúdo e contatos preservados (WhatsApp, endereço, links da Receita e certificado digital)

## Deploy futuro: GitHub Actions → S3 → CloudFront

1. Crie um bucket S3 (site estático) e uma distribuição CloudFront apontando para ele.
2. No repositório GitHub, cadastre os secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION` (ex.: `sa-east-1`)
   - `S3_BUCKET` (nome do bucket)
   - `CLOUDFRONT_DISTRIBUTION_ID` (para invalidar cache após o deploy)
3. Renomeie/ative o workflow em `.github/workflows/deploy-s3.yml` (já está pronto como template).
4. Push na branch `main` dispara o sync do site para o bucket e a invalidação `/*` no CloudFront.

> Até esses secrets existirem, o workflow permanece documentado no arquivo — não rode em produção sem as credenciais corretas.
