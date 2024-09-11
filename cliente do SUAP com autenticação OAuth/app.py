from flask import Flask, redirect, url_for, session, request, jsonify, render_template
from authlib.integrations.flask_client import OAuth

app = Flask(__name__)
app.debug = True
app.secret_key = 'q8Dx!r4Zs@9#bL1v3%yN^5eP&2tK*uM'  # Substitua por uma chave secreta segura em produção

# Configuração do OAuth
oauth = OAuth(app)
oauth.register(
    name='suap',
    client_id="Vv16SZsfsdhMRBzzlaX0QC7pfkD41qW0yzsk9mDh",  # Substitua pelo seu client_id
    client_secret="2AZWO4hUaDttXiR4UMm7ZnV0XdhhuvgZ2gHFPXelR3lAJEgFmrEPAzKnY8fqsRMeC3n1xfaUHJ4Duszpo4TXidMtUGFX0DHwN2IEVSnLUQblCTjb2XEsJSCQhvc0stxF",  # Substitua pelo seu client_secret
    api_base_url='https://suap.ifrn.edu.br/api/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://suap.ifrn.edu.br/o/token/',
    authorize_url='https://suap.ifrn.edu.br/o/authorize/',
    fetch_token=lambda: session.get('suap_token')
)

@app.route('/')
def index():
    if 'suap_token' in session:
        meus_dados = oauth.suap.get('v2/minhas-informacoes/meus-dados')
        return render_template('user.html', user_data=meus_dados.json())
    else:
        return render_template('index.html')

@app.route('/login')
def login():
    redirect_uri = url_for('auth', _external=True)
    print(redirect_uri)
    return oauth.suap.authorize_redirect(redirect_uri)


@app.route('/login/authorized')
def auth():
    token = oauth.suap.authorize_access_token()
    session['suap_token'] = token
    return redirect(url_for('index'))

@app.route('/logout')
def logout():
    session.pop('suap_token', None)
    return redirect(url_for('index'))

@app.route('/boletim')
def boletim():
    # Exemplo de dados que você pode querer exibir
    boletim_data = {
        'titulo': 'Boletim Mensal',
        'conteudo': 'Aqui está o conteúdo do boletim mensal. Informações importantes serão exibidas aqui.',
    }
    return render_template('boletim.html', boletim=boletim_data)


if __name__ == "__main__":
    app.run()
