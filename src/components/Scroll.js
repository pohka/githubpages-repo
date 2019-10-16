
function ScrollTo(id)
{
  if (id != null) {
    var el = document.getElementById(id);
    if (el !== null) {
      var elRect = el.getBoundingClientRect();
      var bodyRect = document.body.getBoundingClientRect();
      var offset = elRect.top - bodyRect.top;
      document.documentElement.scrollTop = offset;

      document.location.hash = id;
    }
  }
}

export default ScrollTo;