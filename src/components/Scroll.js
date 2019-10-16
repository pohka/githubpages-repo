
function ScrollTo(id)
{
  if (id != null) {
    var el = document.getElementById(id);
    if (el !== null) {
      var elRect = el.getBoundingClientRect();
      var bodyRect = document.body.getBoundingClientRect();
      var offset = elRect.top - bodyRect.top;
      document.location.hash = id;
      document.documentElement.scrollTop = offset;
    }
  }
}

export default ScrollTo;