import "../../styles/form.css"

export default function Form() {
    return (
        <form action="/">
              <input type="text" placeholder="カード検索" className="name-input"/>
              <input type="submit" value={"検索"} className="submit-btn"/>
        </form>
    )
}