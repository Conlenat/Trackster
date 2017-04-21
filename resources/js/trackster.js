var Trackster = {};

// Function that allows for Search Button and Enter key functionality

$(document).ready(function() {
  $('#search-button').click(function() {
    Trackster.searchTracksByTitle($('#search-input').val());
    $("#search-input").val("");
  });
  $("#search-input").keypress(function (e) {
    if (e.which === 13) {
      $("#search-button").click();
      $("#search-input").val("");
      return false;
    }
  });
});

// Function for stylings and emptying array when a new search is started

Trackster.renderTracks = function(tracks) {
  var $trackList = $('#track-list');

  $trackList.empty();

  // Creating a row with API data and positioning data correctly

  for (var trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
    var track = tracks[trackIndex];
    var htmlTrackRow =
      '<div class="row track">' +
      '  <div class="col-xs-2 col-xs-offset-1" style="margin-left: 45px; width: 45px;">' + trackIndex + '</div>' +
      '  <div class="col-xs-1 col-xs-offset-1 play-button" style="margin-left: 20px;">' +
      '    <a href="' + track.preview_url + '" target="_blank">' +
      '      <i class="fa fa-play-circle-o fa-2x"></i>' +
      '    </a>' +
      '  </div>' +
      '  <div class="col-xs-4" style="margin-left: 20px;">' + track.name + '</div>' +
      '  <div class="col-xs-2">' + track.artists[0].name + '</div>' +
      '  <div class="col-xs-2" style="margin-right: 25px;">' + track.album.name + '</div>' +
      '  <div class="col-xs-2" style="margin-left: 25px;">' + track.popularity + '</div>' +
      '</div>';

    $trackList.append(htmlTrackRow);
  }
};

// Function that searches the Spotify API for the samples that are similar to user search

Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: 'https://api.spotify.com/v1/search?type=track&q=' + title,
    success: function(response) {
      Trackster.renderTracks(response.tracks.items);
    }
  });


  // Loading Animation for the Logo (albeit that the searches respond quickly that it's usually unnecessary)

  $(document).on({
    ajaxStart: function() {
      $(".logo").slideUp();
      $(".logo").slideDown().stop();
      return false;
    },
    ajaxStop: function() {
      $(".logo").slideDown().stop();
      return false;
    }
  });
};
